var SaveAnswersAsWorkNotes = Class.create();
SaveAnswersAsWorkNotes.prototype = {
    initialize: function(incId) {
		this.incId = incId;
		this.wn    = "";
    },
	saveAnswers: function()  {
		this._questions();
		this._saveWorkNotes();
	},
	_questions: function() {
		var ans = new GlideRecord('question_answer');
		ans.addQuery('table_sys_id',this.incId);
		ans.query();
		while (ans.next()) {
			this.wn += ans.question.question_text + ": " + ans.value + "\n";
		}
	},
	_saveWorkNotes: function() {
		var inc = new GlideRecord('incident');
		inc.get('sys_id',this.incId);
		inc.work_notes = this.wn;
		inc.update();
    }, 
    type: 'SaveAnswersAsWorkNotes'
};
