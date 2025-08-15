"use client";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { GalleryThumbnails, GalleryThumbnailsIcon, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import Post from "@/components/Post";
import { PostFormCommand } from "@/components/post/command-form";

const Page = () => {
  const { data: session, status } = useSession();
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`/api/posts/`);
      const data = await response.json();
      return data;
    },
  });
  console.log(session);
  console.log(data);
  return (
    <Layout>
      <Card className="mx-6 p-3  rounded-md flex flex-col gap-2">
        <div>
          <div className="flex gap-3">
            {session?.user?.image ? (
              <Image src={session.user.image} />
            ) : (
              <Skeleton className="h-12 bg-green-500 w-12 rounded-full" />
            )}

            <PostFormCommand />
          </div>
        </div>

        <Separator />
        <div className="flex gap-16 mx-8 justify-around">
          <div className="flex gap-3 justify-center items-center">
            <Video />
            <span>Live Video</span>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <GalleryThumbnails />
            <span>Photo/video</span>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <FaceSmileIcon className="h-6 " />
            <span>Feeling/activity</span>
          </div>
        </div>
      </Card>
      <div className="mx-6 my-2">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/4 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {isPending ? (
        <div className="space-y-4 mt-3">
          <Skeleton className="bg-green-500 mx-6 h-96" />
          <Skeleton className="bg-green-500 mx-6 h-96" />
          <Skeleton className="bg-green-500 mx-6 h-96" />
        </div>
      ) : data?.error || data.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500">
            Be the first to share something with your neighbors!
          </p>
        </div>
      ) : (
        <div className="mx-6">
          {data?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Page;
