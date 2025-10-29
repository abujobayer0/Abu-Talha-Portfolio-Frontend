'use client';
import { Pagination } from '@nextui-org/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationControls({ totalPages, currentPage }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());

    // 👇 prevent scroll by using 'shallow' flag
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='flex justify-center my-8'>
      <Pagination
        showControls
        color='warning'
        initialPage={currentPage}
        page={currentPage}
        size='sm'
        total={totalPages}
        variant='bordered'
        onChange={handlePageChange}
      />
    </div>
  );
}
