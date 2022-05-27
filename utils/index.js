const { Ability, AbilityBuilder } = require("@casl/ability");

function getToken(req) {
  let token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;
  return token && token.length ? token : null;
}
const policies = {
  guest(user, { can }) {
    can("read", "product");
  },
  user(user, { can }) {
    can("read", "product", { user_id: user._id });
    can("read", "category");
    can("read", "tag");
    can("read", "address");
    can("view", "Order");
    can("create", "Order");
    can("read", "Order", { user_id: user._id });
    can("update", "User", { user_id: user._id });
    can("read", "Cart", { user_id: user._id });
    can("read", "Invoice", { user_id: user._id });
    can("read", "payment");
  },
  admin(user, { can }) {
    can("read", "product", { user_id: user._id });
    can("create", "product", { user_id: user._id });
    can("update", "product", { user_id: user._id });
    can("delete", "product", { user_id: user._id });
    can("detail", "product", { user_id: user._id });
    can("read", "category");
    can("create", "category", { user_id: user._id });
    can("update", "category", { user_id: user._id });
    can("delete", "category", { user_id: user._id });
    can("detail", "category", { user_id: user._id });
    can("read", "tag");
    can("create", "tag", { user_id: user._id });
    can("update", "tag", { user_id: user._id });
    can("delete", "tag", { user_id: user._id });
    can("detail", "tag"), { user_id: user._id };
    can("read", "address");
    can("detail", "address", { user_id: user._id });
    can("create", "address", { user_id: user._id });
    can("update", "address", { user_id: user._id });
    can("delete", "address", { user_id: user._id });
    can("view", "Order");
    can("create", "Order");
    can("read", "Order", { user_id: user._id });
    can("update", "User", { user_id: user._id });
    can("read", "Cart", { user_id: user._id });
    can("update", "Cart", { user_id: user._id });
    can("view", "DeliveryAddress", { user_id: user._id });
    can("create", "DeliveryAddress", { user_id: user._id });
    can("update", "DeliveryAddress", { user_id: user._id });
    can("delete", "DeliveryAddress", { user_id: user._id });
    can("read", "Invoice", { user_id: user._id });
    can("read", "kabupaten");
    can("detail", "kabupaten", { user_id: user._id });
    can("create", "kabupaten", { user_id: user._id });
    can("update", "kabupaten", { user_id: user._id });
    can("delete", "kabupaten", { user_id: user._id });
    can("read", "kecamatan");
    can("detail", "kecamatan", { user_id: user._id });
    can("create", "kecamatan", { user_id: user._id });
    can("update", "kecamatan", { user_id: user._id });
    can("delete", "kecamatan", { user_id: user._id });
    can("read", "kelurahan");
    can("detail", "kelurahan", { user_id: user._id });
    can("create", "kelurahan", { user_id: user._id });
    can("update", "kelurahan", { user_id: user._id });
    can("delete", "kelurahan", { user_id: user._id });
    can("read", "provinsi");
    can("detail", "provinsi", { user_id: user._id });
    can("create", "provinsi", { user_id: user._id });
    can("update", "provinsi", { user_id: user._id });
    can("delete", "provinsi", { user_id: user._id });
    can("read", "payment");
    can("detail", "payment", { user_id: user._id });
    can("create", "payment", { user_id: user._id });
    can("update", "payment", { user_id: user._id });
    can("delete", "payment", { user_id: user._id });
  },
};
const policiesuser = (user) => {
  let builder = new AbilityBuilder();
  if (user && typeof policies[user.role] == "function") {
    policies[user.role](user, builder);
  } else {
    console.log(user);
    policies["guess"][user.builder];
  }
  return new Ability(builder.rules);
};

module.exports = {
  getToken,
  policiesuser,
};
