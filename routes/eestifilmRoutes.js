const express = require("express");
const router = express.Router();

const {
	filmHomePage,
	filmPeople,
	filmPeopleAdd,
	filmPeopleAddPost,
	filmPosition,
	filmPositionAdd,
	filmPositionAddPost,
	films,
	filmsAdd,
	filmsAddPost
} = require("./../controllers/eestifilmControllers");

router.route("/").get(filmHomePage);
router.route("/filmiinimesed").get(filmPeople);
router.route("/filmiinimesed_add").get(filmPeopleAdd);
router.route("/filmiinimesed_add").post(filmPeopleAddPost);
router.route("/ametid").get(filmPosition);
router.route("/ametid_add").get(filmPositionAdd);
router.route("/ametid_add").post(filmPositionAddPost);
router.route("/filmid").get(films);
router.route("/filmid_add").get(filmsAdd);
router.route("/filmid_add").post(filmsAddPost);

module.exports = router;