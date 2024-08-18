import { defineConfig } from "tsup";
import packageJson from "./package.json";
import esbuildPluginLicense from "esbuild-plugin-license";

const banner = `/*! ${packageJson.name}@${packageJson.version} by ${packageJson.author} - ${packageJson.license} */`;

const licenseNoticeOpts = {
  banner: `
/*! 
 * <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> 
 * Find third-party licenses in LICENSE.txt  
 */
`,
  thirdParty: {
    output: {
      file: "LICENSE.txt",
      template(dependencies: any) {
        return dependencies
          .map(
            (dep: any) =>
              `${dep.packageJson.name}:${dep.packageJson.version} by ${dep.packageJson.author?.name} -- ${dep.packageJson.license} -- ${dep.packageJson.repositoery?.url || dep.packageJson.homepage}`,
          )
          .join("\n");
      },
    },
  },
};

export default defineConfig([
  // npm module (no bundling)
  {
    entry: ["./src/index.ts"],
    format: "esm",
    target: "esnext",
    dts: true,
    // sourcemap: true,
    clean: true,
    treeshake: true,
  },
  // es6 module (bundled)
  {
    entry: {
      geom: "./src/index.ts",
    },
    format: ["esm"],
    outDir: "dist",
    bundle: true,
    skipNodeModulesBundle: false,
    target: "esnext",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true,
    outExtension() {
      return {
        js: ".esm.js",
      };
    },
    banner: {
      js: banner,
    },
    esbuildPlugins: [esbuildPluginLicense(licenseNoticeOpts)],
    noExternal: [/./],
  },
]);
