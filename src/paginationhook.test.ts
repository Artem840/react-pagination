import { usePagination } from "./paginationhook";
import { renderHook, act } from "@testing-library/react-hooks"

describe("Test pagination hook", () => {
    
    it("Empty array, is paginating false", async () => {
        const {
            result
        } = renderHook(() => usePagination([]));

        expect(result.current.currentPage).toEqual(1);
        expect(result.current.isPaginating).toBeFalsy();
        expect(result.current.totalPages).toEqual(0);
    });

    it("Paginating true", async () => {
        
        const arr: any[] = [];
        for (let i = 0; i < 20; i++) {
            arr.push(i);
        }

        const {
            result
        } = renderHook(() => usePagination(arr));

        expect(result.current.currentPage).toEqual(1);
        expect(result.current.isPaginating).toBeTruthy();
        expect(result.current.totalPages).toEqual(2);
        expect(result.current.pageItems[0]).toEqual(0);

        act(() => {
            result.current.setCurrentPage(2);
        });

        expect(result.current.currentPage).toEqual(2);
        expect(result.current.pageItems[0]).toEqual(10);
    });

    it("Array less than page size, Paginating false", async () => {
        
        const arr: any[] = [];
        for (let i = 0; i < 9; i++) {
            arr.push(i);
        }

        const {
            result
        } = renderHook(() => usePagination(arr));

        expect(result.current.currentPage).toEqual(1);
        expect(result.current.isPaginating).toBeFalsy();
        expect(result.current.totalPages).toEqual(1);
        expect(result.current.pageItems[0]).toEqual(0);
        expect(result.current.pageItems[8]).toEqual(8);
    });

    it("Page size 3 (non default), Paginating true", async () => {
        
        const arr: any[] = [];
        for (let i = 0; i < 20; i++) {
            arr.push(i);
        }

        const {
            result
        } = renderHook(() => usePagination(arr, 3));

        expect(result.current.currentPage).toEqual(1);
        expect(result.current.isPaginating).toBeTruthy();
        expect(result.current.totalPages).toEqual(7);
        expect(result.current.pageItems[0]).toEqual(0);

        act(() => {
            result.current.setCurrentPage(2);
        });

        expect(result.current.currentPage).toEqual(2);
        expect(result.current.pageItems[0]).toEqual(3);

        act(() => {
            result.current.setCurrentPage(7);
        });

        expect(result.current.currentPage).toEqual(7);
        expect(result.current.pageItems[0]).toEqual(18);
    });

    it("Set page to non existing page, pageItems empty", async () => {
        
        const arr: any[] = [];
        for (let i = 0; i < 20; i++) {
            arr.push(i);
        }

        const {
            result
        } = renderHook(() => usePagination(arr));

        expect(result.current.currentPage).toEqual(1);
        expect(result.current.isPaginating).toBeTruthy();
        expect(result.current.totalPages).toEqual(2);
        expect(result.current.pageItems[0]).toEqual(0);

        act(() => {
            result.current.setCurrentPage(3);
        });

        expect(result.current.currentPage).toEqual(3);
        expect(result.current.pageItems.length).toEqual(0);
    });
});