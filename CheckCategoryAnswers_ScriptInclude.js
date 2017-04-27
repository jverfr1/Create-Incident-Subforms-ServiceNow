var CheckCategoryAnswers = Class.create();
CheckCategoryAnswers.prototype = {
    initialize: function() {
    },
    checkAnswers: function(id) {
		var ans = new GlideRecord('question_answer');
		ans.addQuery('table_sys_id',id);
		ans.query();
		ans.deleteMultiple();
	},
    type: 'CheckCategoryAnswers'
};