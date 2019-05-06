const fs = require('fs');
const { exec } = require('child_process');

// Utils
function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, () => {
      resolve();
    });
  });
}

async function createNewModule(argv) {

  if (argv.length < 4) {
    console.log('\nPlease ensure TYPE and NAME are not null!\n');
    process.exit();
  }

  var allowTypes = ['module', 'component'];
  var type = argv[2];

  if (!allowTypes.includes(type)) {
    console.log(`\nPlease ensure TYPE is once of ${JSON.stringify(allowTypes)} !\n`);
    process.exit();
  }

  var name = argv[3];
  var className = camelCaseToDash(name) + '-' + type;
  var moduleTypePath = `src/${type}s`;
  var newModulePath = `${moduleTypePath}/${name}`;

  await executeCommand(`mkdir -p ${newModulePath}`);

  console.log('data', {
    name,
    className,
    moduleTypePath,
    newModulePath,
  });

  // Create index.ts
  fs.writeFileSync(`${newModulePath}/index.ts`, `export * from './${name}';\n`);
  console.log(`\n- Created: ${newModulePath}/index.ts`);

  // Create [name].scss
  fs.writeFileSync(`${newModulePath}/${name}.scss`, `.${className} {\n\t\n}\n`);
  console.log(`- Created: ${newModulePath}/${name}.scss`);

  // Create [name].tsx
  let moduleTemplate = await fs.readFileSync('tools/ModuleTemplate.tsx');
  moduleTemplate = moduleTemplate.toString();
  moduleTemplate = moduleTemplate.replace(/ModuleTemplate/g, `${name}`);
  moduleTemplate = moduleTemplate.replace('#className', `${className}`);
  fs.writeFileSync(`${newModulePath}/${name}.tsx`, moduleTemplate);
  console.log(`- Created: ${newModulePath}/${name}.tsx`);

  // Auto import into index.ts
  await executeCommand(`echo "export * from './${name}';" >> ${moduleTypePath}/index.ts`);
  console.log(`- Imported: ${moduleTypePath}/index.ts`);
}

var argv = process.argv;
createNewModule(argv);