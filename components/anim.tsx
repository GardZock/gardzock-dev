import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export declare const enum MoveDirection {
    bottom = "bottom",
    bottomLeft = "bottom-left",
    bottomRight = "bottom-right",
    left = "left",
    none = "none",
    right = "right",
    top = "top",
    topLeft = "top-left",
    topRight = "top-right",
    outside = "outside",
    inside = "inside"
}
export type MoveDirectionAlt = "bottom-left" | "bottom-right" | "top-left" | "top-right";

export declare const enum OutMode {
    bounce = "bounce",
    none = "none",
    out = "out",
    destroy = "destroy",
    split = "split"
}


export default function Anim() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 120,
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 1,
                    width: 1,
                },
                move: {
                    direction: "top-left",
                    enable: true,
                    outModes: {
                        default: "out"
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 150,
                },
                opacity: {
                    value: 1,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
                className="-z-[1] absolute"
            />
        );
    }

    return <></>;
};