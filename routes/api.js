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

// add route per task
router.get('/task/:id', function(req, res) {
	var query = {"_id": req.params.id};
	Task.findOne(query, function(err, task){
		console.log(task)
		res.render(
			'task',
			{title : 'Task API - ' + task.title, task : task}
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

router.put('/task/:id', function(req, res) {
    var query = {"_id": req.params.id};
    var update = {title : req.body.title};
    var options = {new: true};
        Task.findOneAndUpdate(query, update, options, function(err, task){
            console.log(task)
            res.render(
            'task',
                {title : 'Task API - ' + task.title, task : task}
        );
    });
});

// delete a task
router.delete('/task/:id', function(req, res) {
    var query = {"_id": req.params.id};
    Task.findOneAndRemove(query, function(err, task){
        console.log(task)
        res.redirect('/api/tasks');
    });
});

module.exports = router;
