import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Field, Title } from 'components';
import './auth.scss';

interface CreateProps extends RouteComponentProps<any> {}

export const Create: React.FC<CreateProps> = () => {
    const [password, setPassword] = useState<string>('');
    const [groupId, setGroupId] = useState<number | null>(null);

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        setPassword(target.value);
    };

    const handleJoin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let errors: Array<string> = [];

        if (!password) {
            errors.push('The password is a required field.');
        }

        const response = await fetch('http://localhost:5000/RegisterGroup', {
            method: 'POST',
            body: JSON.stringify(password),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            setGroupId(await response.json());
        } else {
            toast.error('Ooops something happened');
        }
    };

    const renderContent = () => {
        if (!groupId) {
            return (
                <>
                    <Title>Create a new private </Title>
                    <form onSubmit={handleJoin}>
                        <Field
                            label="Password"
                            type="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        <Button type="submit">Create</Button>
                    </form>

                    <div className="or-option">
                        <Link to="/join">Or join existing</Link>
                    </div>
                </>
            );
        }

        return (
            <>
                <Title>You can join with the group id {groupId}</Title>
                <Link to={`/join/${groupId}`}>
                    <Button>Join</Button>
                </Link>
            </>
        );
    };

    return <div className="create">{renderContent()}</div>;
};
