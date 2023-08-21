"use client";
import * as z from "zod";
import React, { useState } from "react";
import { Category, Color, Product, Size, image } from "@prisma/client";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alertModal";
import ImageUpload from "@/components/ui/imageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  initialData: Product & {
    images: image[]
  } | null;
  categories: Category[],
  colors: Color[],
  sizes: Size[]
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({url: z.string()}).array().min(0),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()    
});

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories, sizes, colors }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Product" : "Create Product";
  const Description = initialData ? "Edit a Product" : "Add A new Product";
  const toastMessage = initialData ? "Product Updated" : "Create Product";
  const action = initialData ? "Save Changes!" : "Create Product";

  const params = useParams();
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      name: "",
      images: [],
      price: 0,
      categoryId: '',
      sizeId: '',
      colorId: '',
      isFeatured: false,
      isArchived: false
    },
  });
  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData)
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      else await axios.post(`/api/${params.storeId}/products`, data);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product Successfully Deleted!");
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      ></AlertModal>
      <div className="flex items-center justify-between flex-row">
        <Heading title={title} description={Description}></Heading>
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4"></Trash>
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <FormField
            control={form.control}
            name={"images"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((img) => img.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((cur) => cur.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 max-md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name={"price"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <>
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    {...field}
                    defaultValue={field.value}
                    value={field.value}
                  >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="select a Category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <FormControl>
                    <SelectContent>
                     {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))} 
                    </SelectContent>
                  </FormControl>
                  <FormMessage />
                  </Select>
                </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <>
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    {...field}
                    defaultValue={field.value}
                    value={field.value}
                  >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="select a Size"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <FormControl>
                    <SelectContent>
                     {sizes?.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))} 
                    </SelectContent>
                  </FormControl>
                  <FormMessage />
                  </Select>
                </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <>
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    {...field}
                    value={field.value}
                    defaultValue={field.value}
                  >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="select a Color"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <FormControl>
                    <SelectContent>
                     {colors?.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))} 
                    </SelectContent>
                  </FormControl>
                  <FormMessage />
                  </Select>
                </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name={"isFeatured"}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox checked={field.value} 
                    // @ts-ignore
                    onCheckedChange={field.onChange}/>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This product will appear on Home Page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"isArchived"}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox checked={field.value} 
                    // @ts-ignore
                    onCheckedChange={field.onChange}/>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Archived?
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the Store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ProductForm;
