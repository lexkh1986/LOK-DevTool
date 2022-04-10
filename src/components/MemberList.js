import React from 'react';
import {
    Table, Button
} from 'reactstrap';
import metamaskIcon from '../assets/images/metamask16.png';
import polygonIcon from '../assets/images/polygon16.png';

const MemberList = ({ members }) => {
    return (
        <div className='member-list'>
            <Table hover responsive size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Discord</th>
                        <th className='col-center'>Level</th>
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
            <td className='col-center'><Button outline className='mem-level' color='success' size='sm'>{member.level}</Button></td>
            <td>
                <img className='wallet-icon' alt='Wallet Type' src={member.wallet.type === 'polygon' ? polygonIcon : metamaskIcon} />
                {member.wallet.address}
            </td>
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