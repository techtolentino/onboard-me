var express = require('express'),
	router = express.Router(),
    mongoose = require('mongoose'),
    Task = mongoose.model('tasks');

// get all tasks
router.get('/tasks', function(req, res) {
	Task.find(function(err, tasks) {
		console.log(tasks);
		res.render(
			'api',
			{title: 'Task API', tasks: tasks}
		);
	});
});

router.get('/task/:id', function(req, res) {
	var query = {"_id": req.params.id};
	Task.findOne(query, function(err, task){
		console.log(task)
		res.render(
			'task',
			{title : 'Task API - ' + task.name, task : task}
		);
	});
});

// add a task
router.post('/tasks', function(req, res) {
	new Task({title: req.body.title})
	.save(function(err, task) {
		console.log(task)
		res.redirect('/api/tasks')
	});
});

module.exports = router;