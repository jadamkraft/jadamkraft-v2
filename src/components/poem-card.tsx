export function PoemCard() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-start rounded-lg bg-cover bg-center bg-no-repeat p-8 font-serif italic leading-loose text-foreground"
      style={{
        backgroundImage: "url('/assets/paper-texture.png')",
      }}
    >
      <p className="text-sm">
        Just a half touch, Incidental. Maybe in times small things stayed small.
        When did the world change?
      </p>
      <p className="mt-4 text-sm">
        It only ever made my soul scream louder. I can't find any place to rest
        my body now
      </p>
      <p className="mt-4 text-sm">Except in Ex- istential dreams.</p>
    </div>
  );
}
