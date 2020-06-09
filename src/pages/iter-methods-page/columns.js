// @scripts
import { config } from '../../config';
import { format } from '../../util';

const getColumns = (xArray) => {
    const columns = [{
        id: 'n',
        label: config.text.common.n,
        width: 100
    }];

    for (let i = 0; i < xArray.length; i++) {
        columns.push({
            id: `x{${i}}`,
            label: format(config.text.common.currentX, i + 1),
            width: 100
        });
    }

    columns.push({
        id: 'error',
        label: config.text.common.toleranceError,
        width: 100
    });

    return columns;
};

export default getColumns;
