var SaveAnswersValues = Class.create();
SaveAnswersValues.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    save: function() {
		var question      = this.getParameter('sysparm_question');
		var questionValue = this.getParameter('sysparm_value');
		var incId 		  = this.getParameter('sysparm_id');
        var q 			  = new GlideRecord('question_answer');
		q.addQuery('table_sys_id',incId);
		q.addQuery('question',question);
		q.query();
		while (q.next()) {
			q.value = questionValue;
			q.update();
		}
		result = this.newItem('result');
		result.setAttribute('message','Cuestionario guardado correctamente');
		return result;
	},
    type: 'SaveAnswersValues'
});