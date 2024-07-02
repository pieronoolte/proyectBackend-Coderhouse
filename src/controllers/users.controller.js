const UsersService = require('../dao/models/users.dao');
const service = new UsersService();


const getUsers = async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  const users = await service.findDTO(size)
  res.json(users);

}

const getUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await service.findOne(uid);
    res.render('layouts/updatedUser', { user: user })
  } catch (error) {
    next(error)
  }
}

const putUserRole = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { role } = req.params;
    const userRole = await service.updateRole(uid, role)
    // eslint-disable-next-line no-console
    console.log(userRole)
  } catch (error) {
    next(error)
  }
}

const deleteUserLastConnection = async (req, res, next) => {
  try {
    const deletedCount = await service.deleteInactiveUsers()
    res.json(deletedCount);
  } catch (error) {
    next(error)
  }
}

module.exports = { getUser, getUsers, putUserRole, deleteUserLastConnection }
