import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { Button, Field, Switch, Title } from 'components';
import './auth.scss';

interface PokerJoinProps extends RouteComponentProps<any> {}

export const PokerJoin: React.FC<PokerJoinProps> = () => {
    const { push } = useHistory();
    const { groupId } = useParams();

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [group, setGroup] = useState<string>((groupId as string) || '');
    const [isObserver, setIsObserver] = useState<boolean>(false);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setName(target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setPassword(target.value);
    };

    const handleGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setGroup(target.value);
    };

    const handleIsObserverChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setIsObserver(target.checked);
    };

    const handleJoin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let errors: Array<string> = [];

        if (!name || !password) {
            errors.push('Name and password are required fields.');
        }

        if (isNaN(parseInt(group))) {
            errors.push('Group Id should be number.');
        }

        if (errors.length) {
            return errors.forEach(error => toast.error(error));
        }

        const response = await fetch('http://localhost:5000/VerifyGroup', {
            method: 'POST',
            body: JSON.stringify({
                id: parseInt(group),
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            push('/poker', { name, role: isObserver ? 1 : 0, group });
        } else {
            toast.error('Bad credentials.');
        }
    };

    return (
        <div className="join">
            <Title>Join to an existing group</Title>
            <form onSubmit={handleJoin}>
                <Field
                    label="Name"
                    type="text"
                    onChange={handleNameChange}
                    value={name}
                />
                <Field
                    label="Password"
                    type="password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <Field
                    label="Group id"
                    type="text"
                    onChange={handleGroupChange}
                    value={group}
                />
                <Switch
                    label="Observer"
                    onChange={handleIsObserverChange}
                    checked={isObserver}
                />
                <Button type="submit">Join</Button>
            </form>

            <div className="or-option">
                <Link to="/create">Or create one</Link>
            </div>
        </div>
    );
};
