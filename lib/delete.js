module.exports = function() {
    prompt(questions).then(function(data) {
        delete tplJson[data.name];

        fs.writeFile(tplPath, JSON.stringify(tplJson), 'utf-8', function(err, data) {
            if (err) {
                console.log('模板删除失败');
            } 
            console.log('模板删除成功');
        });
    });
};