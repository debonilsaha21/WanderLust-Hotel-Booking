const Listing = require("../models/listing");




module.exports.index = async (req, res) => {
    let allListing = await Listing.find();
    res.render("./listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/create.ejs");
};

module.exports.addListing = async (req, res) => {
    // let {title, description, image, price, location, country}= req.body;
    let listing = req.body.listing;
    const newlisting = new Listing(listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New Listing Created!!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash("success", "Listing Edited!!");
    res.redirect(`/listings/${ id }`);
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not Exist");
        res.redirect("/listings");
    } else {
        res.render("./listings/show.ejs", { listing });
    }
};

module.exports.deleteListing = async (req, res) => {
    console.log(req.params);
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!!");
    res.redirect("/listings");
};