import mongoose from 'mongoose';

import Role from '../../models/Role.js';
import User from '../../models/user.js';

const RoleController = {
  createRole: async (req, res) => {
    try {
      const { name, permissions } = req.body;
      const newRole = new Role({ name, permissions });

      await newRole.save();
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  initRoles: async (req, res) => {
    try {
      const rolesToCreate = [
        { name: 'notLoginUser', permissions: ['login', 'logout', 'createUser'] },
        { name: 'user', permissions: ['login', 'logout', 'createUser'] },
        {
          name: 'admin',
          permissions: [
            'login',
            'logout',
            'createUser',
            'getUser',
            'getAllUsers',
            'deleteUser',
          ],
        },
        {
          name: 'superadmin',
          permissions: [
            'login',
            'logout',
            'createUser',
            'getUser',
            'getAllUsers',
            'deleteUser',
            'createRole',
            'getRoles',
            'updateRole',
            'assignRole',
          ],
        },
      ];
      const newRoles = await Role.insertMany(rolesToCreate);

      const role = await Role.findOne({ name: 'superadmin' });

      const userData = {
        username: 'superadmin',
        surname: 'supre',
        email: 'superadmin@gmail.com',
        password: '$2b$10$4/.OiJITfi7hHGvMyOPx5uyqy3.FAbSUBeWDf/MVasghtZQRnylnu', // superadmin
        role: role._id,
      };

      const newUser = new User(userData);
      const savedUser = await newUser.save();

      res.status(201).json({ roles: newRoles, savedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRoles: async (req, res) => {
    try {
      const roles = await Role.find();

      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const { roleId } = req.params;
      const { permissionsToAdd } = req.body;

      // Using $addToSet to add multiple unique permissions
      const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        {
          $addToSet: { permissions: { $each: permissionsToAdd } },
        },
        { new: true },
      );

      if (!updatedRole) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  assignRole: async (req, res) => {
    try {
      const { userId, roleId } = req.body;
      // Checking if the role exists
      const roleExists = await Role.findById(roleId);

      if (!roleExists) {
        return res.status(404).send('Role not found');
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { role: roleId },
        { new: true },
      ).populate('role');

      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

export default RoleController;
