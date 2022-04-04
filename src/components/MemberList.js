import React from 'react';
import {
    Table, Button
} from 'reactstrap';

const MemberList = ({ members }) => {
    return (
        <div className='member-list'>
            <Table hover responsive striped size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Discord</th>
                        <th>Level</th>
                        <th>Wallet Address</th>
                        <th>Email</th>
                        <th>Kingdoms</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, key) => <Member key={key} member={member} />)}
                </tbody>
            </Table>
        </div>
    );
}

const Member = ({ member }) => {
    return (
        <tr>
            <td>{member.id}</td>
            <td>{member.discord}</td>
            <td>{member.level}</td>
            <td>{member.wallet.address + ' [' + member.wallet.type + ']'}</td>
            <td>{member.email}</td>
            <td><Kingdoms memberRef={member.id} list={member.kingdoms} /></td>
        </tr>
    );
}

const Kingdoms = ({ memberRef, list }) => {
    return (
        <div className='kingdom' member_ref={memberRef}>
            {
                list.map((kingdom, key) => (
                    <Button outline color='info' size='sm' key={key}>{kingdom}</Button>
                ))
            }
        </div>
    );
}

export default MemberList;