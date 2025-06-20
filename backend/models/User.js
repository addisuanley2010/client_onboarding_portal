module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'client', 
          },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companySize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      industryType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expectedTimeline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      budgetRange: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serviceNeeded: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customService: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '12345',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"pending"
      },
      urltoken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return User;
};

