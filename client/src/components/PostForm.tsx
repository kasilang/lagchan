import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PostFormProps {
  boardSlug?: string;
  threadId?: number;
  onSuccess?: () => void;
}

export default function PostForm({ boardSlug, threadId, onSuccess }: PostFormProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createThreadMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const url = `/api/boards/${boardSlug}/threads`;
      return await apiRequest("POST", url, data);
    },
    onSuccess: () => {
      toast({ title: "Thread created successfully!" });
      queryClient.invalidateQueries({ queryKey: [`/api/boards/${boardSlug}/threads`] });
      setSubject("");
      setContent("");
      setImage(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast({ 
        title: "Error creating thread", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const url = `/api/threads/${threadId}/posts`;
      return await apiRequest("POST", url, data);
    },
    onSuccess: () => {
      toast({ title: "Post created successfully!" });
      queryClient.invalidateQueries({ queryKey: [`/api/threads/${threadId}`] });
      setContent("");
      setImage(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast({ 
        title: "Error creating post", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({ 
        title: "Error", 
        description: "Content is required",
        variant: "destructive" 
      });
      return;
    }
    
    const formData = new FormData();
    if (!threadId && subject) formData.append('subject', subject);
    formData.append('content', content.trim());
    if (image) formData.append('image', image);

    if (threadId) {
      createPostMutation.mutate(formData);
    } else {
      createThreadMutation.mutate(formData);
    }
  };

  const isLoading = createThreadMutation.isPending || createPostMutation.isPending;

  return (
    <div className="reply-form">
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            {!threadId && (
              <tr>
                <td><label>Subject:</label></td>
                <td>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ width: '300px' }}
                  />
                </td>
              </tr>
            )}
            <tr>
              <td><label>Comment:</label></td>
              <td>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={5}
                  cols={50}
                  placeholder="Enter your message here..."
                />
              </td>
            </tr>
            <tr>
              <td><label>File:</label></td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  type="submit"
                  value={threadId ? "Post Reply" : "Submit"}
                  disabled={isLoading}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
