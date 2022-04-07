import React from 'react';
import {
    Table, Button, Col
} from 'reactstrap';

const LandContribution = ({ lands, members }) => {
    const buildContribution = () => {

        if (!members || !lands) {
            return [];
        }

        // Build headers
        let headers = ['#', 'Discord', 'Kingdom', 'Total'];
        lands.map(function (land) {
            if (land.isFilled) {
                headers.push(land.id);
            }
        });

        // Build body
        let body = [];
        let count = 1;
        JSON.parse(members).map(function (mem) {
            mem.kingdoms.map(function (kingdom) {
                let row = { no: count, discord: mem.discord, kingdom: kingdom, total: 0 };
                lands.map(function (land) {
                    row[land['id']] = 0;
                });
                body.push(row);
                count += 1;
            })
        });
        
        // Fill body data
        lands.map(function (land) {
            land.data.map(function (item) {
                body.map(function (row) {
                    if (row.kingdom === item.name) {
                        row[land.id] = item.total;
                        row.total += item.total;
                    }
                });
            });
        });

        return body;
    };

    return (
        <Table hover responsive size='sm'>
            {
                buildContribution(lands, members)
            }
        </Table>
    );
}

export default LandContribution;