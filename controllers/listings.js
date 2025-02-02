const Listing = require("../model/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken});


module.exports.index =async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing}); 
};
module.exports.SEARCH =async (req,res)=>{
    let{city} = req.body;
    const allListing = await Listing.find({
        $or: [
            { location: { $regex: city, $options: "i" } }, // Case-insensitive match for location
            { country: { $regex: city, $options: "i" } }   // Case-insensitive match for country
        ]
    });

    res.render("listings/index.ejs", { allListing }); 
};
module.exports.renderNewForm =(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must be Logged In to create listing!");
       return res.redirect("/login");
    }
    res.render("./listings/newListing.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you're trying to access does not exist!");
        res.redirect("/listings");
    }
    else{
    res.render("listings/show.ejs",{listing});}
   
 
};

module.exports.createListing =async(req,res,next)=>{
  let resp = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send()
    console.log(resp.body.features[0].geometry)
    
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing)
        newListing.owner = req.user._id;
        newListing.image = {filename,url}
        newListing.geometry = resp.body.features[0].geometry;
        await newListing.save(); 
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
};

module.exports.renderEditForm =async(req,res)=>{
    
    let{id}=req.params;
    const listing = await  Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you're trying to access does not exist!");
        res.redirect("/listings");
    }
    else{
    // res.render("listings/show.ejs",{listing});
    let OGUrl = listing.image.url;
    OGUrl=OGUrl.replace("/upload","/upload/h_150,w_250")
    res.render("listings/edit.ejs",{listing,OGUrl});}
};

module.exports.updateListing =async(req,res)=>{
    let{id}=req.params;
    let resp = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()

     let listing =await  Listing.findByIdAndUpdate(id,{...req.body.listing});
     if(typeof req.file!="undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {filename,url};
    //  const newListing = new Listing(req.body.listing)
        // newListing.owner = req.user._id;
        // newListing.image = {filename,url}
        listing.geometry = resp.body.features[0].geometry;
        // await newListing.save(); 
     await listing.save();}
     req.flash("success"," Listing Updated!");

     res.redirect(`/listings/${id}`)

};

module.exports.destroyListing = async(req,res)=>{
    let{id}=req.params;
     await  Listing.findByIdAndDelete(id);
     req.flash("success"," Listing Deleted!");

    res.redirect("/listings");

};
