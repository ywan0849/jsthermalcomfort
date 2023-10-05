import { expect, describe, it } from "@jest/globals";
import { set_tmp, set_tmp_array } from "../../src/models/set_tmp";
import { deep_close_to_array } from "../test_utilities";

describe("set_tmp", () => {
  it("should be a function", () => {
    expect(set_tmp).toBeInstanceOf(Function);
  });

  it.each([
    {
      tdb: 25,
      tr: 25,
      v: 0.1,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: undefined,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: undefined,
      limit_inputs: undefined,
      kwargs: undefined,
      expected: 24.3,
    },
    {
      tdb: 25,
      tr: 25,
      v: 0.1,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: undefined,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: undefined,
      limit_inputs: undefined,
      kwargs: { calculate_ce: true },
      expected: 24.7,
    },
    {
      tdb: 77,
      tr: 77,
      v: 0.328,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: undefined,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: "IP",
      limit_inputs: undefined,
      kwargs: undefined,
      expected: 75.8,
    },
    {
      tdb: 77,
      tr: 77,
      v: 0.328,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: undefined,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: "SI",
      limit_inputs: true,
      kwargs: undefined,
      expected: NaN,
    },
    {
      tdb: 27,
      tr: 30,
      v: 0.328,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: 0,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: "SI",
      limit_inputs: true,
      kwargs: undefined,
      expected: 26.6,
    },
    {
      tdb: 77,
      tr: 77,
      v: 0.328,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: 0,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: "sitting",
      units: "SI",
      limit_inputs: false,
      kwargs: { round: false },
      expected: 66.25029829890893,
    },
    {
      tdb: 77,
      tr: 77,
      v: 0.328,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: 0,
      body_surface_area: 1.8258,
      p_atm: 101325,
      body_position: "standing",
      units: "SI",
      limit_inputs: false,
      kwargs: { round: false },
      expected: 66.29853487495205,
    },
    {
      tdb: 5,
      tr: 30,
      v: 0.5,
      rh: 50,
      met: 0.5,
      clo: 2,
      wme: undefined,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: undefined,
      limit_inputs: true,
      kwargs: undefined,
      expected: NaN,
    },
    {
      tdb: 25,
      tr: 25,
      v: 0.1,
      rh: 50,
      met: 1.2,
      clo: 0.5,
      wme: undefined,
      body_surface_area: undefined,
      p_atm: undefined,
      body_position: undefined,
      units: undefined,
      limit_inputs: undefined,
      kwargs: { round: false },
      expected: 24.31487798647244,
    },
  ])(
    "returns $expected when tdb is $tdb, tr is $tr, v is $v, rh is $rh, met is $met, clo is $clo and units is $units",
    ({
      tdb,
      tr,
      v,
      rh,
      met,
      clo,
      wme,
      body_surface_area,
      p_atm,
      body_position,
      units,
      limit_inputs,
      kwargs,
      expected,
    }) => {
      const result = set_tmp(
        tdb,
        tr,
        v,
        rh,
        met,
        clo,
        wme,
        body_surface_area,
        p_atm,
        body_position,
        units,
        limit_inputs,
        kwargs,
      );
      if (isNaN(expected)) {
        expect(result).toBeNaN();
      } else {
        expect(result).toBeCloseTo(expected, 1);
      }
    },
  );
});

describe("set_tmp_array", () => {
  it("should be a function", () => {
    expect(set_tmp_array).toBeInstanceOf(Function);
  });

  it.each([
    {
      tdbArray: [25, 25],
      trArray: [25, 25],
      vArray: [0.1, 0.1],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wmeArray: undefined,
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: undefined,
      units: undefined,
      limit_inputs: undefined,
      expected: [24.3, 24.3],
    },
    {
      tdbArray: [25, 50],
      trArray: [25, 25],
      vArray: [0.1, 0.1],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wmeArray: undefined,
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: undefined,
      units: undefined,
      limit_inputs: undefined,
      expected: [24.3, NaN],
    },
    {
      tdbArray: [30, 30],
      trArray: [25, 25],
      vArray: [0.5, 0.5],
      rhArray: [60, 60],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wmeArray: [0, 0],
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: ["standing", "sitting"],
      units: "SI",
      limit_inputs: undefined,
      expected: [26.3, 26.2],
    },
    {
      tdbArray: [77, 50],
      trArray: [77, 45],
      vArray: [0.328, 0.4],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wmeArray: undefined,
      bodySurfaceArray: [19.65, 19.65],
      pAtmArray: undefined,
      bodyPositionArray: ["standing", "sitting"],
      units: "IP",
      limit_inputs: undefined,
      expected: [75.8, NaN],
    },
    {
      tdbArray: [77, 50],
      trArray: [77, 45],
      vArray: [0.328, 0.4],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wme: [0, 0],
      bodySurfaceArray: undefined,
      pAtmArray: [1, 1],
      bodyPositionArray: ["standing", "sitting"],
      units: "IP",
      limit_inputs: undefined,
      expected: [75.8, NaN],
    },
    {
      tdbArray: [77, 50],
      trArray: [77, 45],
      vArray: [0.328, 0.4],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wme: [0, 0],
      bodySurfaceArray: undefined,
      pAtmArray: [1, 1],
      bodyPositionArray: ["standing", "sitting"],
      units: "IP",
      limit_inputs: false,
      expected: [75.8, 45.6],
    },
    {
      tdbArray: [77, 50],
      trArray: [77, 45],
      vArray: [0.328, 0.4],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wme: [0, 0],
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: undefined,
      units: "SI",
      limit_inputs: false,
      expected: [66.3, 48.8],
    },
    {
      tdbArray: [77, 50, 40],
      trArray: [77, 45, 40],
      vArray: [0.328, 0.4, 0.2],
      rhArray: [50, 50, 40],
      metArray: [1.2, 1.2, 1.5],
      cloArray: [0.5, 0.5, 0.2],
      wme: undefined,
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: undefined,
      units: "SI",
      limit_inputs: false,
      expected: [66.3, 48.8, 35.7],
    },
    {
      tdbArray: [77, 50, 40],
      trArray: [77, 45, 40],
      vArray: [0.328, 0.4, 0.2],
      rhArray: [50, 50, 40],
      metArray: [1.2, 1.2, 1.5],
      cloArray: [0.5, 0.5, 0.2],
      wme: [0, 0, 0],
      bodySurfaceArray: [1.8258, 1.8258, 1.8258],
      pAtmArray: [101325, 101325, 101325],
      bodyPositionArray: undefined,
      units: "SI",
      limit_inputs: true,
      expected: [NaN, NaN, 35.7],
    },
    {
      tdbArray: [77, 50, 40, 30],
      trArray: [77, 45, 40, 25],
      vArray: [0.328, 0.4, 0.2, 0.5],
      rhArray: [50, 50, 40, 30],
      metArray: [1.2, 1.2, 1.5, 1.2],
      cloArray: [0.5, 0.5, 0.2, 0.4],
      wme: [0, 0, 0, 0],
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: ["sitting", "sitting", "sitting", "sitting"],
      units: undefined,
      limit_inputs: undefined,
      expected: [NaN, NaN, 35.6, 24],
    },
    {
      tdbArray: [77, 77],
      trArray: [77, 77],
      vArray: [0.328, 0.328],
      rhArray: [50, 50],
      metArray: [1.2, 1.2],
      cloArray: [0.5, 0.5],
      wme: undefined,
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: ["standing", "sitting"],
      units: "IP",
      limit_inputs: true,
      kwargs: { round: false },
      expected: [75.76678037565038, 75.70549348304166],
    },
    {
      tdbArray: [25, 35, 40],
      trArray: [25, 25, 30],
      vArray: [0.1, 0.5, 0.1],
      rhArray: [50, 60, 50],
      metArray: [1.2, 1.2, 1.2],
      cloArray: [0.5, 0.5, 0.7],
      wme: undefined,
      bodySurfaceArray: undefined,
      pAtmArray: undefined,
      bodyPositionArray: undefined,
      units: undefined,
      limit_inputs: undefined,
      kwargs: { calculate_ce: true },
      expected: [24.7, 30.3, 37.4],
    },
    {
      tdbArray: [25, 35, 40],
      trArray: [25, 25, 30],
      vArray: [0.1, 0.5, 0.1],
      rhArray: [50, 60, 50],
      metArray: [1.2, 1.2, 1.2],
      cloArray: [0.5, 0.5, 0.7],
      wme: [0, 0, 0],
      bodySurfaceArray: [1.8258, 1.8258, 1.8258],
      pAtmArray: [101325, 101325, 101325],
      bodyPositionArray: ["standing", "standing", "standing"],
      units: "SI",
      limit_inputs: true,
      kwargs: { calculate_ce: true, round: false },
      expected: [24.662341402637953, 30.316140625628694, 37.411665924404794],
    },
  ])(
    "%j",
    ({
      tdbArray,
      trArray,
      vArray,
      rhArray,
      metArray,
      cloArray,
      wmeArray,
      bodySurfaceArray,
      pAtmArray,
      bodyPositionArray,
      units,
      limit_inputs,
      kwargs,
      expected,
    }) => {
      const result = set_tmp_array(
        tdbArray,
        trArray,
        vArray,
        rhArray,
        metArray,
        cloArray,
        wmeArray,
        bodySurfaceArray,
        pAtmArray,
        bodyPositionArray,
        units,
        limit_inputs,
        kwargs,
      );
      deep_close_to_array(result, expected, 1);
    },
  );
});
