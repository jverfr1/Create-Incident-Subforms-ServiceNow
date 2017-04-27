var CreateCategoryAnswers = Class.create();
CreateCategoryAnswers.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    createAnswers: function() {
		var incId       = this.getParameter('sysparm_id');
		var category 	= this.getParameter('sysparm_category');
		var subcategory = this.getParameter('sysparm_subcategory');
		var category3   = this.getParameter('sysparm_category3');
		var empty 		= true;
		var	result		= this.newItem('result');
		var qString 	= "u_category=" + category + "^u_subcategory=" + subcategory + "^u_category3=" + category3;
		var wn 			= new SaveAnswersAsWorkNotes(incId);
		var check 		= new CheckCategoryAnswers();
		wn.saveAnswers();
		check.checkAnswers(incId);
		var q = new GlideRecord('u_categories_questions_relationship');
		q.addEncodedQuery(qString);
		q.query();
		while (q.next()) {
			var a = new GlideRecord('question_answer');
			a.initialize();
			a.question.setDisplayValue(q.u_question);
			a.order = q.u_order;
			a.table_name = 'incident';
			a.table_sys_id = incId;
			a.insert();
			empty = false;
		}
		if (empty) {
			result.setAttribute('message','empty');
			return result;
		}else {
			result.setAttribute('message','answers created');
			return result;			
		}
		
	},
    type: 'CreateCategoryAnswers'
});