const router = require("express").Router();
const DeliveryAddressController = require("./controller");
const KabupatenController = require("./Kabupaten/controller");
const KecamatanController = require("./Kecamatan/controller");
const KelurahanController = require("./Kelurahan/controller");
const ProvinsiController = require("./Provinsi//controller");
const { police_check } = require("../../middlewares");

router.get(
  "/address",
  police_check("read", "address"),
  DeliveryAddressController.index
);
router.get(
  "/address/:id",
  police_check("detail", "address"),
  DeliveryAddressController.detail
);
router.post(
  "/address",
  police_check("create", "address"),
  DeliveryAddressController.store
);
router.patch(
  "/address/update/:id",
  police_check("update", "address"),
  DeliveryAddressController.update
);
router.delete(
  "/address/delete/:id",
  police_check("delete", "address"),
  DeliveryAddressController.destroy
);
//-------------------Kabupaten--------------------------------/
router.get(
  "/kabupaten",
  police_check("read", "kabupaten"),
  KabupatenController.index
);
router.get(
    "/kabupaten/:id",
    police_check("detail", "kabupaten"),
    KabupatenController.detail
  );
router.post(
  "/kabupaten/store",
  police_check("create", "kabupaten"),
  KabupatenController.store
);
router.patch(
  "/kabupaten/update/:id",
  police_check("read", "kabupaten"),
  KabupatenController.update
);
router.delete(
  "/kabupaten/delete/:id",
  police_check("delete", "kabupaten"),
  KabupatenController.destroy
);

//--------------------------Kecamatan---------------------------///
router.get(
  "/kecamatan",
  police_check("read", "kecamatan"),
  KecamatanController.index
);
router.get(
    "/kecamatan/detail/:id",
    police_check("detail", "kecamatan"),
    KecamatanController.detail
);
  router.get(
    "/kecamatan",
    police_check("detail", "kecamatan"),
    KecamatanController.index
  );
router.post(
  "/kecamatan/store",
  police_check("create", "kecamatan"),
  KecamatanController.store
);
router.patch(
  "/kecamatan/update/:id",
  police_check("update", "kecamatan"),
  KecamatanController.update
);
router.delete(
  "/kecamatan/delete/:id",
  police_check("delete", "kecamatan"),
    KecamatanController.destroy
);
//-------------------------Kelurahan-----------------------------------//
router.get(
  "/kelurahan",
  police_check("read", "kelurahan"),
  KelurahanController.index
);
router.get(
    "/kelurahan/detail/:id",
    police_check("read", "kelurahan"),
    KelurahanController.detail
  );
router.post(
  "/kelurahan/store",
  police_check("create", "kelurahan"),
  KelurahanController.store
);
router.patch(
  "/kelurahan/update/:id",
  police_check("update", "kelurahan"),
  KelurahanController.update
);
router.delete(
    "/kelurahan/delete/:id",
    police_check("delete", "kelurahan"),
    KelurahanController.destroy
  );

//-----------------------------Provinsi----------------------------------/
router.get(
  "/provinsi",
  police_check("read", "provinsi"),
  ProvinsiController.index
);
router.get(
    "/provinsi/:id",
    police_check("read", "provinsi"),
    ProvinsiController.detail
  );
router.post(
  "/provinsi/store",
  police_check("create", "provinsi"),
  ProvinsiController.store
);
router.patch(
  "/provinsi/update/:id",
  police_check("update", "provinsi"),
  ProvinsiController.update
);
router.delete(
  "/provinsi/delete/:id",
  police_check("delete", "provinsi"),
  ProvinsiController.destroy
);

module.exports = router;
