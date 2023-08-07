const mongoose =require ("mongoose");
const sectionModel = require("../model/section");
const { ObjectId } = require("mongoose").Types;

const creacteSection = async function (req, res) {
  try {
    const data = req.body;
    const { section } = data;
    const sectionData = await sectionModel.create(
        { section }
        );
        await sectionData.save();
        res.status(200).send({
            message:"section created successfully",
            data:sectionData
        });
  } catch (error) {
    console.log(error);
  }
};

const getAllSection = async function (req,res){
    try{
const data = await sectionModel.find();

res.status(200).send({
    message:"section fetch successfully",
    data:data
});
    }catch (error){
        console.log(error);
    }
};

const singleSection = async function (req,res){
    try{
 const {id} = req.params;
 const data = req.body;
 const sectionData = await section.findOne(
    {_id: new ObjectId(id)},
 );
 res.status(200).send({
    message:"single section data successfully",
    data:sectionData
 });
    }catch (error){
        console.log(error);
    }
};

const updateSection = async function(req,res){
    try{
const {id} = req.params;
const data = req.body;
const {
    section
}= data;
const section1 = await sectionModel.findOneAndUpdate(
    {_id:new ObjectId(id)},
    {
        section
    },
    {new:true}
);
res.status(200).send({
    message:"section update successfully",
    data:section1
});
    }catch (error){
        console.log(error);
    }
};

const deleteSection = async function(req,res){
    try{
const {id} = req.params;
const sectionData= await sectionModel.findOneAndDelete(
    {_id:new ObjectId(id)},
);
res.status(200).send({
    message:"section data deleted successfuly",
    data:sectionData
});
    }catch (error){
        console.log(error);
    }
};

module.exports={
    creacteSection,
    getAllSection,
    singleSection,
    updateSection,
    deleteSection,
    

};
