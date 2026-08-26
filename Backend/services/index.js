exports.generateCrudMethods = Model => {
    return {
      getAll: (filter = {}) => Model.find(filter),
      getById: (id) => Model.findById(id),
      create: (record) => Model.create(record),
      update: (id, record) =>
        Model.findByIdAndUpdate(id, record, { new: true }),
      updateByUsername: (username, record) =>
        Model.findOneAndUpdate({ Name: username }, record, { new: true }),
      delete: (id) => Model.findByIdAndDelete(id),
      deleteAll: (filter = {}) => Model.deleteMany(filter),
    };
}