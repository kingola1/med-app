import apiClient from "@/lib/api-client";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions,
} from "@tanstack/react-query";

// Generic fetcher function
const fetcher = async <T>(url: string, params?: object): Promise<T> => {
	const response = await apiClient.get<T>(url, { params });
	return response.data;
};

// Generic poster function
const poster = async <T, D>(url: string, data: D): Promise<T> => {
	const response = await apiClient.post<T>(url, data);
	return response.data;
};

export const useGet = <T>(
	key: string[],
	url: string,
	params?: object,
	options?: Omit<
		UseQueryOptions<T, Error, T, string[]>,
		"queryKey" | "queryFn"
	>
) => {
	return useQuery<T, Error, T, string[]>({
		queryKey: key,
		queryFn: () => fetcher<T>(url, params),
		...options,
	});
};

export const usePost = <T, D>(
	url: string,
	options?: UseMutationOptions<T, Error, D>
) => {
	return useMutation<T, Error, D>({
		mutationFn: (data: D) => poster<T, D>(url, data),
		...options,
	});
};

// Generic putter function
const putter = async <T, D>(url: string, data: D): Promise<T> => {
	const response = await apiClient.put<T>(url, data);
	return response.data;
};

export const usePut = <T, D>(
	url: string,
	options?: UseMutationOptions<T, Error, D>
) => {
	return useMutation<T, Error, D>({
		mutationFn: (data: D) => putter<T, D>(url, data),
		...options,
	});
};

// Generic patcher function
const patcher = async <T, D>(url: string, data: D): Promise<T> => {
	const response = await apiClient.patch<T>(url, data);
	return response.data;
};

export const usePatch = <T, D>(
	url: string,
	options?: UseMutationOptions<T, Error, D>
) => {
	return useMutation<T, Error, D>({
		mutationFn: (data: D) => patcher<T, D>(url, data),
		...options,
	});
};
