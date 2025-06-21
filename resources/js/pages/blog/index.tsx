import { TableCell, TableRow } from '@/components/ui/table';

export default function Index({ posts }) {
    return (
        <div>
            {posts.map((image) => (
                <TableRow key={image.id}>
                    <TableCell>{image.id}</TableCell>
                    <TableCell>{image.name}</TableCell>
                    <TableCell>{image.status}</TableCell>
                    <TableCell>{image.description}</TableCell>
                    <TableCell>
                        {image.status === 'ready' && (
                            <a href={image.url} target="_blank">
                                <button>Preview</button>
                            </a>
                        )}
                        <button>Delete</button>
                    </TableCell>
                </TableRow>
            ))}
        </div>
    );
}
