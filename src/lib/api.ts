const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  password_confirmation?: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  is_premium: boolean;
  created_at: string;
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Load tokens from localStorage if available
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 errors by attempting to refresh the token
    if (response.status === 401 && this.refreshToken) {
      try {
        const refreshResponse = await this.refreshAccessToken();
        if (refreshResponse) {
          // Retry the original request with the new token
          return this.request<T>(endpoint, options);
        }
      } catch (error) {
        this.logout();
        throw new Error('Session expired. Please login again.');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'An error occurred' }));
      throw new Error(errorData.error || 'An error occurred');
    }

    // If T is Response, return the response object directly
    if (typeof Response !== 'undefined' && Response.prototype === Object.getPrototypeOf(Response.prototype).constructor.prototype) {
      return response as unknown as T;
    }

    // Otherwise, parse the JSON and return the data
    const data = await response.json();
    return data as T;
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.request<Response>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const authData = await response.json() as AuthResponse;
    this.setTokens(authData.access_token, authData.refresh_token);
    return authData;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.request<Response>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const authData = await response.json() as AuthResponse;
    this.setTokens(authData.access_token, authData.refresh_token);
    return authData;
  }

  async refreshAccessToken(): Promise<AuthResponse | null> {
    if (!this.refreshToken) return null;

    try {
      const response = await this.request<Response>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      });
      const authData = await response.json() as AuthResponse;
      this.setTokens(authData.access_token, authData.refresh_token);
      return authData;
    } catch (error) {
      this.clearTokens();
      return null;
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request('/api/auth/me');
  }

  async updateUser(data: Partial<User>): Promise<User> {
    return this.request('/api/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  logout() {
    this.clearTokens();
  }

  // Habit endpoints
  async getHabits(showArchived = false) {
    return this.request(`/api/habits?show_archived=${showArchived}`);
  }

  async createHabit(data: any) {
    return this.request('/api/habits', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateHabit(id: string, data: any) {
    return this.request(`/api/habits/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteHabit(id: string) {
    return this.request(`/api/habits/${id}`, {
      method: 'DELETE',
    });
  }

  async archiveHabit(id: string) {
    return this.request(`/api/habits/${id}/archive`, {
      method: 'POST',
    });
  }

  async unarchiveHabit(id: string) {
    return this.request(`/api/habits/${id}/unarchive`, {
      method: 'POST',
    });
  }

  async completeHabit(id: string, date: string) {
    return this.request(`/api/habits/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ date }),
    });
  }

  async exportHabits() {
    return this.request('/api/habits/export');
  }

  async importHabits(data: any) {
    return this.request('/api/habits/import', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(); 