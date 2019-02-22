module.exports.init = (db) => {
    return new Promise(async (resolve, reject) => {
		var action;
	
		await db.actions.create({
			name: 'on',
			comment: 'Switch on the related device.',
		});

		await db.actions.create({
			name: 'off',
			comment: 'Switch off the related device.',
		});

		await db.actions.create({
			name: 'open',
			comment: 'Open the related device.',
		});

		await db.actions.create({
			name: 'close',
			comment: 'Close the related device.',
		});

		resolve();
    });
}
