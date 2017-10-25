const query = require('../query');

module.exports = async function(activity) {

    let mostActive = activity !== 'leastActive' ?  true : false;

    let selectGroupBy = `
        SELECT COUNT(movieid)
        FROM actorsmovies
        GROUP BY actorid
    `;

    let result = await query(selectGroupBy);
    console.log(result);
};


// mysql> SELECT student.student_name,COUNT(*)
//        FROM student,course
//        WHERE student.student_id=course.student_id
//        GROUP BY student_name;