const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try{
    const response = await Drone.find()
    console.log(response);
    res.render("drones/list.hbs", {
      allDrones : response
    })

  }
  catch(err){
    next(err);
  }
  
});
router.get("/drones/:id/details", async (req, res, next)=>{
  try{
    const response = await Drone.findById(req.params.id)
    res.render("drones/drone-details.hbs", {
      oneDrone :response
    })
  }
  catch(err){
    next(err)
  }
})

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  })
  .then(()=>{
    res.redirect("/drones")
  })
  .catch((err)=>{
    next(err)
  })
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try{
    const droneToEdit = await Drone.findById(req.params.id)
    res.render("drones/update-form.hbs", {
      droneToEdit : droneToEdit
    })

  } 
  catch (err){
    next(err)
  }
  
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try{
    const response = await Drone.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
    })
    res.redirect(`/drones/${req.params.id}/edit`)

  }
  catch(err){
    next(err)
  }
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
Drone.findByIdAndDelete(req.params.id)
.then(()=>{
  res.redirect("/drones")
})
.catch((err)=>{
  next(err)
})
});

module.exports = router;
