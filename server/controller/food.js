import { NotFoundError } from "../errors/index.js";
import Restaurant from "../model/Restaurant.js";
import { StatusCodes } from "http-status-codes";
const getItem = async (req, res) => {
  try {
    const { itemId, id } = req.params;

    const restaurant = await Restaurant.findOne(
      { _id: id, "menu._id": itemId },
      { "menu.$": 1 }
    ); // $ to project only the matching item
    //console.log(restaurant);

    if (!restaurant || !restaurant.menu.length) {
      throw new NotFoundError(`No item with id: ${itemId}`);
    }

    res.status(StatusCodes.OK).json({ restaurantId : restaurant._id , item : restaurant.menu[0] });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { itemId, id } = req.params;
    const { item } = req.body;
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, "menu._id": itemId },
      {
        $set: {
          "menu.$.itemName": item.itemName,
          "menu.$.price": item.price,
          "menu.$.description": item.description,
          "menu.$.image": item.image,
        },
      },
      { new: true, runValidators: true }
    );
    console.log(restaurant);

    if (!restaurant) {
      throw new NotFoundError(`No item with id : ${itemId}`);
    }
    const updatedRestaurant = restaurant.menu.find(
      (item) => item._id.toString() === itemId.toString()
    );
    res.status(StatusCodes.OK).json({ item: updatedRestaurant });
  } catch (error) {
    throw new NotFoundError(`No item with id : ${itemId}`);
  }
};
const deleteItem = async (req, res) => {
  try {
    const { itemId, id } = req.params;
    const restaurant = await Restaurant.findOneAndUpdate({
      _id: id,
      "menu._id": itemId,
    },{$pull : { menu : {_id : itemId} }},{new :true});
    if (!restaurant) {
      throw new NotFoundError(`No item with id : ${itemId}`);
    }
    res.status(StatusCodes.OK).json({ menu : restaurant.menu });
  } catch (error) {
    console.log(error);
    
  }
};

export { getItem, updateItem, deleteItem };
