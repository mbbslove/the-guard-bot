'use strict';

const Datastore = require('nedb-promise');

const Command = new Datastore({
	autoload: true,
	filename: 'data/Command.db',
});

Command.ensureIndex({
	fieldName: 'name',
	unique: true,
});

const addCommand = command =>
	Command.update(
		{ id: command.id, isActive: false },
		{ id: command.id, isActive: false, state: 'add', },
		{ upsert: true }
	);

const updateCommand = (data) =>
	Command.update({ id: data.id, isActive: false }, { $set: data });

const removeCommand = command => Command.remove(command);

const getCommand = (data) => Command.findOne(data);

const listCommands = () => Command.find({ isActive: true });

module.exports = {
	addCommand,
	getCommand,
	listCommands,
	removeCommand,
	updateCommand,
};
