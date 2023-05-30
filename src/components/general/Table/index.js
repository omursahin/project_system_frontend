import { useState } from 'react';
import {
    Funnel,
    SortNumericDown,
    SortNumericDownAlt,
    SortAlphaDown,
    SortAlphaDownAlt,
    XLg,
} from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './style.css';
import Stack from 'react-bootstrap/Stack';

export default function MyTable({
    tableTitle,
    head,
    body,
    searchable,
    addNewEntry,
}) {
    const [sorting, setSorting] = useState({ key: 0, orderBy: 'desc' });
    const [search, setSearch] = useState('');
    const filteredData =
        body &&
        body
            .filter((items) =>
                items.some((item) =>
                    (item?.key || item)
                        .toString()
                        .toLocaleLowerCase('TR')
                        .includes(search.toLocaleLowerCase('TR'))
                )
            )
            .sort((a, b) => {
                if (sorting?.orderBy) {
                    const res = (a[sorting.key]?.key || a[sorting.key])
                        .toString()
                        .localeCompare(b[sorting.key]?.key || b[sorting.key]);
                    if (sorting?.orderBy === 'desc') {
                        return res;
                    }
                    return res * -1;
                }
            });

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>{tableTitle}</h2>
                <div className="vr d-none d-md-block" />
                <div className="ms-auto ms-md-0">{addNewEntry}</div>
                <div className="ms-auto d-none d-md-block">
                    {searchable && (
                        <div className="table-search hidden-xs">
                            <Form.Control
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Tabloda ara"
                                id="filterSearch"
                            />
                            {search ? (
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        setSearch('');
                                    }}
                                >
                                    <XLg size={14} />
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    )}
                </div>
            </Stack>
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            {head.map((h, key) => (
                                <th width={h?.width} key={key}>
                                    <div className="head-item">
                                        <span>{h.name}</span>
                                        {h.sortable && (
                                            <Button
                                                variant="link"
                                                onClick={() => {
                                                    if (sorting?.key === key) {
                                                        setSorting({
                                                            key,
                                                            orderBy:
                                                                sorting.orderBy === 'asc' ? 'desc' : 'asc',
                                                        });
                                                    } else {
                                                        setSorting({
                                                            key,
                                                            orderBy: 'asc',
                                                        });
                                                    }
                                                }}
                                            >
                                                {sorting?.key === key &&
                                                    (sorting.orderBy === 'asc'
                                                        ? {
                                                            numeric: <SortNumericDownAlt size={16} />,
                                                            alpha: <SortAlphaDownAlt size={16} />,
                                                        }[h.sortable]
                                                        : {
                                                            numeric: <SortNumericDown size={16} />,
                                                            alpha: <SortAlphaDown size={16} />,
                                                        }[h.sortable])}
                                                {sorting?.key !== key && <Funnel size={16} />}
                                            </Button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {body && body.length && filteredData.length
                            ? filteredData.map((items, key) => (
                                <tr key={key}>
                                    {items.map((item, key) => (
                                        <td key={key}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                {item}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                            : ''}
                    </tbody>
                </Table>
                {!body || !body.length || !filteredData.length ? (
                    <Alert variant="warning">
                        {search ? (
                            <span>
                                <strong>{search}</strong> araması için sonuç bulunamadı.
                            </span>
                        ) : (
                            'Tabloda görüntülenecek veri bulunamadı.'
                        )}
                    </Alert>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}
