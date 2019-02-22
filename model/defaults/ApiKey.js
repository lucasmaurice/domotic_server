module.exports.init = (db) => {
    return new Promise(async (resolve, reject) => {
		await db.apiKeys.create({
			key: 'e411e06c86a49d19b11936c3f7ee541f7b68ee282a87e86300d9eae110368449',
            active: true,
            comment: 'initial key for tests (deezsaltynuts)'
		});
		resolve();
    });
}
