program
  .usage('<template-name> [project-name]');

program.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.yellow('    # 使用npm模板创建'))
  console.log('    $ struct init template-name my-project')
  console.log('    $ struct init webpack my-project')
  console.log()
});
// init 命令的帮助文档
function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}

help();

const template = program.args[0];
const dir = program.args[1];
const to = path.resolve(dir || '.');
 // 模板不存在将不执行初始化项目的操作
if (!tplJson[template]) {
    console.log(chalk.red(`template.json里没有${template}的模板信息，请添加！`));
    return;
}
if (!dir || dir.indexOf('/') > -1) {
    console.log(chalk.red('请输入项目名名称'));
    return;
}

function run () {
    console.log(chalk.yellow(`使用模板${template}创建项目`));
    const spinner = ora('正在下载模板');
    spinner.start();

     // 下载模板到本地

    exec(`tnpm i ${tplJson[template].npm}`, (err, data) => {
        spinner.stop();
        process.on('exit', () => {
            rm(`${process.cwd()}/node_modules`)
        })
        if (err) {
            console.log(chalk.red('模板下载失败 ', err.message));
        }
        const tplPath = `${process.cwd()}/node_modules/${tplJson[template].npm}`;
        const opts = require(`${tplPath}/meta`);
        const projectPath = `${process.cwd()}/${dir}`;

        // 生成新项目

        Metalsmith(`${tplPath}/template`)
            .source('.')
            .destination(`${projectPath}`)
            .build(function(err) {
                if (err) {
                    console.log(chalk.red('项目生成失败', err));
                }
                console.log(chalk.yellow(' \n 项目已创建'));
            })
    });
}