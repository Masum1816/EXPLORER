
const generateUniqueId = require("generate-unique-id");
const schema = require("../Models/schema");
const fs = require('fs');

const DefaultController = async (req, res) => {

    let data = await schema.find();
    res.render('index', {Datas: data});

}

const AddMovieContoller = async (req, res) => {

    let uniqueId = generateUniqueId({
        length: 4,
        useLetters: false
    })

    const dataObj = {
        id: uniqueId,
        name: req.body.name,
        director: req.body.director,
        releaseDate: req.body.releaseDate,
        path: req.file.path
    };
    console.log("DATAOBJ : ", dataObj);
    
    const data = new schema(dataObj);
    await data.save();
    
    res.redirect('/');

}

const EditMovieController = async (req, res) => {
    console.log("REQ ID : ", req.params.id);

    const { id } = req.params;

    const editMovie = await schema.findOne({ _id: id });
    console.log("EDIT DATA : ", editMovie);
    
    res.render('editMovie', {
        id: editMovie._id, 
        name: editMovie.name, 
        director: editMovie.director, 
        releaseDate: editMovie.releaseDate,
        posterPath: editMovie.path
    });
};


const UpdateMovieController = async (req, res) => {

    const { id } = req.params;
    
    const updateData = await schema.findById(id);
    
    if (req.file && updateData.path) {
        fs.unlink(updateData.path, (err) => {
            if (err) {
                console.log("ERROR: ", err);
            }
        });
        updateData.path = req.file.path;
    }

    updateData.name = req.body.name;
    updateData.director = req.body.director;
    updateData.releaseDate = req.body.releaseDate;
    
    const updatedMovie = await updateData.save();
    console.log("UPDATED DATA: ", updatedMovie);

    res.redirect('/');
};


const DeleteMovieController = async (req, res) => {

    console.log("REQ ID : ", req.params.id);

    const {id} = req.params;

    const deleteData = await schema.findById(id);

    if(deleteData.path){
        fs.unlink(deleteData.path , (err) => {
            if(err){
                console.log("ERROR : ", err);
            }
        }) 
    }

    const DeleteData = await schema.findByIdAndDelete(id);
    console.log("DELETEDATA : ", DeleteData);

    res.redirect('/');

}

module.exports = {DefaultController, AddMovieContoller, EditMovieController, UpdateMovieController, DeleteMovieController};








