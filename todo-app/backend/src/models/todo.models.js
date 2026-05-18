import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Todo = sequelize.define(
    "Todo", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: false,
            defaultValue: 'medium'
        },

        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
    }
)