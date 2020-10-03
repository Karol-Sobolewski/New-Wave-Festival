const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {

    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const sea = await Seat.findOne().skip(rand);
        if (!sea) res.status(404).json({ message: 'Not found' });
        else res.json(sea);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.getById = async (req, res) => {

    try {
        const sea = await Seat.findById(req.params.id);
        if (!sea) res.status(404).json({ message: 'Not found' });
        else res.json(sea);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.addNew = async (req, res) => {

    try {
        const cleanPost = sanitize(req.body)
        const { day, seat, client, email } = cleanPost;
        const newSeat = new Seat(
            {
                day: day,
                seat: seat,
                client: client,
                email: email
            });
        await newSeat.save();
        req.io.emit('seatsUpdated', await Seat.find());
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.modify = async (req, res) => {
    const { day, seat, client, email } = req.body;

    try {

        const sea = await (Seat.findById(req.params.id));
        if (sea) {
            sea.day = day;
            sea.seat = seat;
            sea.client = client;
            sea.email = email;
            await sea.save();
            res.json(sea);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

exports.remove = async (req, res) => {

    try {
        const sea = await (Seat.findById(req.params.id));
        if (sea) {
            await sea.deleteOne();
            res.json(sea);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};