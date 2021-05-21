---
title: What I learned building a raytracer.
---
I built a raytracer from scratch in python

![final product][topimage]

This is a project I worked on for a few days over christmas break. This post won't serve as a tutorial for this kind of thing, plenty of people have already done that [far better than I could][tutorial].

This was a fun exercise. I wrote it in python, using only numpy and pyplot.

Here are the steps I took to reach the final product.

First, I setup the camera and coordinate system, then added three same-size spheres in the picture.
The speres are colored red, but obviously not shaded yet. 

![initial setup][im01]

Next, a light source was added to the scene, and points in the scene had to check if they were illuminated before drawing,
giving us a slight shadow effect in the next image.

![adding a light source][im02]

Next, it was time to start shading. I used the [Blinn-Phong][blinn-phong] model to shade the objects in the image.
The Blinn-Phong model contains three different components:
- Ambient
- Diffuse
- Specular

I added each in order (the next 3 images). Firstly ambient:

![ambient component][im03]

Next diffuse:

![diffuse component][im04]

Finally specular:

![specular component][im05]

I use an intersection equation to find lots of information about rendering the object,
and every shape has a different rendering equation.

For simplicity, rather than adding a new shape with a new equation model, to add a floor to the scene I just added
a very large sphere, so it looks like a floor. If you look closely, you can see the horizon is curved but it looks
good enough for now.

Once the floor was added, I added reflections to the scene.

![adding reflections][im06]

At this point it looked good, but the only shape that it knew how to shade was a sphere, 
and I wanted to add planes. My first attempt at applying the shader to planes resulted in the below image.

![attempting to add planes][im08]

I'm still not entirely sure what caused this, but with enough tinkering, I eventually got it to work. The final result is
seen at the top of this page.

Because I now have planes working, I might try cubes next, by putting 6 planes together and bounding their dimensions,
but optimization is another thing that needs to be focused on.

# What I learned

- How much math is involved.
    - There is a lot of math that goes into this kind of thing, especially vector math.
    Between calculating intersections and reflections,
    I felt like I learned a lot of practical math that can also be applied in other situations.
- The importance of optimaization.
    - In its current form, my code takes a few minutes to render an HD image.
    If/when I do more work on this project, I will first focus on optimization.
    A few steps I might take to optimize are adding multiple threads, and also optimizing intersections,
    so the code doesn't waste time while there are no objects to render.

[Find the project repo here][repo].
If you want to do this for yourself, or learn more about the math involved,
consult this [tutorial][tutorial] I found on Medium.

[topimage]: /assets/2021/05/17/raytracing-images/image.png
[im01]: /assets/2021/05/17/raytracing-images/01.png
[im02]: /assets/2021/05/17/raytracing-images/02.png
[im03]: /assets/2021/05/17/raytracing-images/03ambient.png
[im04]: /assets/2021/05/17/raytracing-images/04diffuse.png
[im05]: /assets/2021/05/17/raytracing-images/05specular.png
[im06]: /assets/2021/05/17/raytracing-images/06reflection.png
[im07]: /assets/2021/05/17/raytracing-images/07HD.png
[im08]: /assets/2021/05/17/raytracing-images/08plane_try.png
[repo]: https://github.com/sam-baumann/raytracing
[tutorial]: https://medium.com/swlh/ray-tracing-from-scratch-in-python-41670e6a96f9
[blinn-phong]: https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model