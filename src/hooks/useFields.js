import { computed, reactive, ref } from "vue";
import { check } from "@/utils/util.js";

const sceneParser = function (scene, sceneMap) {
  if (!scene) {
    return false;
  }
  const symbolList = ["(", ")", "&", "|", "!"];
  let evalStr = "";
  let word = "";
  for (let c of scene) {
    if (~symbolList.indexOf(c)) {
      if (word === "*") {
        evalStr += `true`;
      } else if (word !== "") {
        evalStr += `${!!sceneMap[word]}`;
        word = "";
      }
      evalStr += c;
    } else {
      word += c;
    }
  }
  if (word) {
    if (word === "*") {
      evalStr += `true`;
    } else {
      evalStr += `${sceneMap[word]}`;
    }
  }
  return eval(evalStr);
};
const calcUseScene = (field, sceneMap) => {
  sceneMap = sceneMap || {};
  if (check.isBoolean(field.canUse)) {
    return field.canUse;
  } else if (!field.useScene) {
    return false;
  } else {
    return sceneParser(field.useScene, sceneMap);
  }
};

const calcDisableScene = (field, sceneMap) => {
  sceneMap = sceneMap || {};
  if (field.disableScene) {
    return sceneParser(field.disableScene, sceneMap);
  } else {
    return !!field.inputOptions.disabled;
  }
};

export default function ({ fields, scene }) {
  let defaultSceneMap = {};
  if (scene) {
    defaultSceneMap = scene.split(",").reduce((map, item) => {
      map[item] = true;
      return map;
    }, {});
  }

  let sceneMap = ref(Object.assign({}, defaultSceneMap));

  // 设置场景
  const setScene = (key, val) => {
    sceneMap.value[key] = val;
  };

  // 重置场景
  const resetScene = () => {
    sceneMap.value = Object.assign({}, defaultSceneMap);
  };

  return {
    fields: computed(() => {
      return fields
        .filter((item) => {
          return calcUseScene(item, sceneMap.value);
        })
        .map((item) => {
          if (item.inputOptions) {
            item.inputOptions.disabled = calcDisableScene(item, sceneMap.value);
          }
          return item;
        });
    }),
    setScene,
    resetScene,
    // setOptions,
    sceneMap: computed(() => {
      return sceneMap;
    }),
  };
}
