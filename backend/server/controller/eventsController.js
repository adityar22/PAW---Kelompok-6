const eventsModel = require('../model/eventsModel');
const mongoose = require('mongoose');
const moment = require('moment');

exports.create = async (req, res) =>{
    const { eventName, eventDesc, eventStart, eventEnd } = req.body;
    const eventUser = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const newEvent = await eventsModel.create({ eventUser, eventName, eventDesc, eventStart, eventEnd });
        res.status(200).json({
            message: "Notes created succesfully",
            data: newEvent
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    };
}

exports.getAll = async (req, res) => {
    const eventUser = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const events = await (await eventsModel.find({ eventUser })).find({
            eventStat:{$gte: moment(req.query.eventStart).toDate()}, 
            eventEnd:{$lte: moment(req.query.eventEnd).toDate()
            }}).exec();

        if (!events) {
            return res.status(404).json({ error: 'No such events' });
        }

        res.status(200).json(events);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getById = async (req, res) => {

}

exports.edit = async (req, res) => {

}

exports.delete = async (req, res) => {

}