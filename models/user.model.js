// define model schema

module.exports = mongoose => {
    let userSchema = mongoose.Schema(
        {
            first_name : { type: String, default: null},
            last_name: { type: String, default: null},
            email: { type: String, unique: true},
            password: { type: String},
            token: { type: String}
        },
        { timestamps: true}
    );
    userSchema.method("toJSON", function(){
        const {__v, _id, ...object } =this.toObject();
        object.v = __v;
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", userSchema);
    return User;
}