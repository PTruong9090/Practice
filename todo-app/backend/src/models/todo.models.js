import { DataTypes } from 'Sequelize'
import { sequelize } from "../db/sequelize";

const Todo = sequelize.define(
    "Todo", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        tite: {
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
            type: DateTypes.DATE,
            allowNull: true,
        },

        createdAt: {
            type: DataTypes.DATE.now(),
            allowNull: true
        },

        updatedAt: {
            type: DataTypes.DATE.now(),
            allowNull: true
        },
    }
)