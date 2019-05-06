#!/bin/bash

TYPE=$1
NAME=$2

if [ $( echo "$TYPE" | egrep -c "^(module|component)$" ) -eq 0 ]; then
  echo "Wrong module type, module type must be in (module | component)"
  exit
fi

if [[ $TYPE = "module" ]]; then 
  MODULE_TYPE_DIR=src/modules
else
  MODULE_TYPE_DIR=src/components
fi

NEW_MODULE_DIR="$MODULE_TYPE_DIR/$NAME"

mkdir -p ${NEW_MODULE_DIR}

# Create index.ts
cat << EOF > ${NEW_MODULE_DIR}/index.ts
export * from './${NAME}';
EOF

# Create ${NAME}.scss
cat << EOF > ${NEW_MODULE_DIR}/${NAME}.scss
.${NAME} {

}
EOF

# Create ${NAME}.tsx
cat << EOF > ${NEW_MODULE_DIR}/${NAME}.tsx
import * as React from "react";

import './${NAME}.scss';

interface Props { }
interface State { }

export class ${NAME} extends React.Component<Props, State> {
  render() {
    return (
      <div className="${NAME}">
        ${NAME}
      </div>
    );
  }
}
EOF

echo "export * from './${NAME}';" >> ${MODULE_TYPE_DIR}/index.ts